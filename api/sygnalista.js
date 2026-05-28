// Vercel Serverless Function — zgłoszenie sygnalisty
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { name, email, subject_person, description, context, basis, preferred_contact, additional_info, lang } = req.body;

        if (!name || !email || !subject_person || !description || !context || !basis) {
            return res.status(400).json({ error: 'Wymagane pola: imię, email, osoba objęta zgłoszeniem, opis, kontekst, podstawy' });
        }

        const resendKey = process.env.RESEND_API_KEY;

        if (resendKey) {
            const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + resendKey,
                },
                body: JSON.stringify({
                    from: 'Portal Sygnalisty FDK <onboarding@resend.dev>',
                    to: ['g.stepien@firmadlakazdego.pl'],
                    reply_to: email,
                    subject: '[SYGNALISTA] Zgłoszenie naruszenia — ' + name,
                    html: '<h2>Zgłoszenie z Portalu Sygnalisty</h2>'
                        + '<p style="color:#c00;font-weight:bold">POUFNE — zgłoszenie objęte ochroną na podstawie ustawy o ochronie sygnalistów</p>'
                        + '<hr>'
                        + '<h3>1. Dane sygnalisty</h3>'
                        + '<p><strong>Imię i nazwisko:</strong> ' + name + '</p>'
                        + '<p><strong>E-mail:</strong> ' + email + '</p>'
                        + (preferred_contact ? '<p><strong>Preferowany kontakt:</strong> ' + preferred_contact + '</p>' : '')
                        + '<hr>'
                        + '<h3>2. Informacje o naruszeniu</h3>'
                        + '<p><strong>Osoba objęta zgłoszeniem:</strong> ' + subject_person + '</p>'
                        + '<p><strong>Opis naruszenia:</strong></p>'
                        + '<p>' + description.replace(/\n/g, '<br>') + '</p>'
                        + '<p><strong>Kontekst związany z pracą:</strong></p>'
                        + '<p>' + context.replace(/\n/g, '<br>') + '</p>'
                        + '<p><strong>Uzasadnione podstawy zgłoszenia:</strong></p>'
                        + '<p>' + basis.replace(/\n/g, '<br>') + '</p>'
                        + (additional_info ? '<hr><h3>3. Dodatkowe informacje</h3><p>' + additional_info.replace(/\n/g, '<br>') + '</p>' : '')
                        + '<hr>'
                        + '<p style="color:#999;font-size:12px">Wysłano z Portalu Sygnalisty fdk-site.vercel.app/sygnalista | Język: ' + (lang || 'pl') + '</p>',
                }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error('Resend error:', errorData);
                return res.status(500).json({ error: 'Nie udało się wysłać zgłoszenia' });
            }

            return res.status(200).json({ success: true });
        }

        // Fallback
        console.log('SYGNALISTA REPORT:', { name, email, subject_person, description, context, basis, preferred_contact, additional_info });
        return res.status(200).json({ success: true, fallback: true });

    } catch (error) {
        console.error('Sygnalista form error:', error);
        return res.status(500).json({ error: 'Błąd serwera' });
    }
}
