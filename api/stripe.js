// Vercel Serverless Function — Stripe Checkout Session
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
        return res.status(500).json({ error: 'Stripe not configured' });
    }

    try {
        const { name, email, title, amount } = req.body;
        if (!name || !email || !title || !amount) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const amountInGrosze = Math.round(parseFloat(amount) * 100);
        if (amountInGrosze < 100) {
            return res.status(400).json({ error: 'Minimalna kwota to 1 PLN' });
        }

        // Create Stripe Checkout Session
        const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + stripeKey,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'payment_method_types[]': 'card',
                'payment_method_types[]': 'p24',
                'mode': 'payment',
                'customer_email': email,
                'client_reference_id': name,
                'line_items[0][price_data][currency]': 'pln',
                'line_items[0][price_data][product_data][name]': title,
                'line_items[0][price_data][product_data][description]': 'Opłata — ' + name,
                'line_items[0][price_data][unit_amount]': amountInGrosze.toString(),
                'line_items[0][quantity]': '1',
                'success_url': 'https://fdk-site.vercel.app/?payment=success',
                'cancel_url': 'https://fdk-site.vercel.app/?payment=cancel',
            }).toString(),
        });

        const session = await response.json();

        if (session.error) {
            console.error('Stripe error:', session.error);
            return res.status(400).json({ error: session.error.message });
        }

        return res.status(200).json({ url: session.url });
    } catch (error) {
        console.error('Stripe error:', error);
        return res.status(500).json({ error: 'Payment error' });
    }
}
