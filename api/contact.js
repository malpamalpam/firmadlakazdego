// Vercel Serverless Function — wysyłka formularza kontaktowego na email
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { name, email, phone, message } = req.body;

        // Email is required
        if (!email) {
            return res.status(400).json({ error: 'E-mail jest wymagany.' });
        }
        // Email format validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,10}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Podaj poprawny adres e-mail.' });
        }
        // Message is required (min 10 chars)
        if (!message || message.trim().length < 10) {
            return res.status(400).json({ error: 'Wiadomość musi mieć minimum 10 znaków.' });
        }
        // Name: optional, but if provided must be ≥ 2 chars
        if (name && name.trim().length < 2) {
            return res.status(400).json({ error: 'Imię musi mieć minimum 2 znaki.' });
        }
        // Phone: optional, but if provided validate format
        if (phone) {
            var phoneDigits = phone.replace(/\D/g, '');
            var isAllSame = /^(.)\1+$/.test(phoneDigits);
            if (phoneDigits.length < 9 || isAllSame) {
                return res.status(400).json({ error: 'Podaj poprawny numer telefonu.' });
            }
        }

        // Wysyłka przez Resend API
        const resendKey = process.env.RESEND_API_KEY;

        if (resendKey) {
            const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + resendKey,
                },
                body: JSON.stringify({
                    from: 'Formularz FDK <onboarding@resend.dev>',
                    to: ['kontakt@firmadlakazdego.pl'],
                    reply_to: email,
                    subject: 'Zapytanie ze strony FDK — ' + name,
                    html: '<h2>Nowe zapytanie ze strony</h2>'
                        + '<p><strong>Imię i nazwisko:</strong> ' + name + '</p>'
                        + '<p><strong>E-mail:</strong> ' + email + '</p>'
                        + '<p><strong>Telefon:</strong> ' + (phone || 'nie podano') + '</p>'
                        + '<hr>'
                        + '<p><strong>Wiadomość:</strong></p>'
                        + '<p>' + (message ? message.replace(/\n/g, '<br>') : '<em>nie podano</em>') + '</p>'
                        + '<hr>'
                        + '<p style="color:#999;font-size:12px">Wysłano z formularza kontaktowego fdk-site.vercel.app</p>',
                }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error('Resend error:', errorData);
                return res.status(500).json({ error: 'Nie udało się wysłać wiadomości' });
            }

            return res.status(200).json({ success: true });
        }

        // Fallback — jeśli brak Resend API key, loguj do konsoli
        console.log('CONTACT FORM:', { name, email, phone, message });
        return res.status(200).json({ success: true, fallback: true });

    } catch (error) {
        console.error('Contact form error:', error);
        return res.status(500).json({ error: 'Błąd serwera' });
    }
}
