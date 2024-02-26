
import { generate as url } from "@/api";
import translator from '@iamtraction/google-translate';

export default async function handler(req, res) {
    const data = req.body;
    const json = JSON.parse(data);
    if (!validate(json)) {
        res.status(400).json({
            error: 'باید یک سبک انتخاب کنید و حداقل ۸ حرف بنویسید.'
        });
    } else {
        let request = { prompt: { main_fa: json.prompt, main_en: "" }, style: json.style, orientation: json.orientation };
        request.prompt.main_en = await translate(json.prompt);
        const result = await generate(request);
        const dream = await result;
        res.status(200).json({ dream })
        try {
            console.log(dream);
        } catch (error) {
            res.status(400).json({
                error: 'ارور در سرور'
            })

        }
    }
}



function validate(data) {
    if ((data.prompt.length > 8) && (data.style)) { return true; }
    else {
        return false;
    }
}

async function translate(text) {
    let res = await translator(text, {to: "en"});
    return res.text;
}

async function generate(data) {
    let header = {
        'content-type': 'application/json',
        'Authorization': 'Bearer d189ad8e23c498c43f25330d1d125721de273a803530b7bb39025cc3e77f95f5b34fedd23d3c16bdaf92bf78609f435cb566ae973fb54241995f54287362074b95e050d28d058688d23977cdf15e619ef9b097459e8a2c9af4be82744072fe072f8eb9c2f8676011d846ac27b9e220c17523a6426e0b65f1a3a90935bd5b0cf1'
    }
    let json = { data: data };
    console.log(json);
    let result = await fetch(url, { method:"POST", body: JSON.stringify(json), headers: header });
    let dream = await result.json();
    return dream;
}