import translate from '@iamtraction/google-translate';

export default async function handler(req, res) {
        let test = await translate('تست', {to: 'en'});
        res.status(200).json({test:test.text});
}