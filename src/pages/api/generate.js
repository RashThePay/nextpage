

import { generate as url } from "@/api";
import translator from '@iamtraction/google-translate';

export default async function handler(req, res) {
    
    const data = req.body;
    const json = JSON.parse(data);
    const token = json.token;
    if (!validate(json)) {
        res.status(400).json({
            error: 'باید یک سبک انتخاب کنید و حداقل ۸ حرف بنویسید.'
        });
    } else {
        
        try {
            let request = { prompt: { main_fa: json.prompt, main_en: "" }, style: json.style, orientation: json.orientation };
        request.prompt.main_en = await translate(json.prompt);
        const result = await generate(request, token);
        const dream = await result;
        if (dream.image) {
            
        res.status(200).json({ dream })
        } else {
            throw new Error(dream);
        }
        } catch (error) {
            res.status(400).json({
                error: dream
            })

        }
    }
}



function validate(data) {
    if ((data.prompt.length > 8) && (data.style > 0)) { return true; }
    else {
        return false;
    }
}

async function translate(text) {
    let res = await translator(text, {to: "en"});
    return res.text;
}

async function generate(data, token) {
    let header = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
    let json = { data: data };
    let result = await fetch(url, { method:"POST", body: JSON.stringify(json), headers: header });
    let dream = await result.json();
    return dream;
}