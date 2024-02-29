import { useState } from "react";
import React from "react";
import { Autocomplete, AutocompleteItem, Chip } from "@nextui-org/react";



export default function App({ mode }) {  
    const tagsjson = {
        "negative": ["آناتومی ضعیف", "نامشخص", "بریده", "بدریخت", "کپی", "اشتباه", "دست اضافی", "پای اضافی", "بی‌تناسب", "گردن بلند", "کیفیت پایین", "وضوح پایین", "بدون پا یا دست", "ناسالم", "جهش ژنتیکی", "خارج از کادر", "متن درج شده", "غیرجذاب", "ناواضح", "بدکیفیت", "کج‌ومعوج", "متن", "حروف", "بدکشیده‌شده", "ناقص", "دست‌نویس", "تار", "مات", "قدیمی", "کات‌شده", "کراپ‌شده", "نامتناسب", "پیچیده", "درهم‌برهم", "دوتایی", "انگشت اضافی", "نقص", "دست عجیب", "پای عجیب", "هیکل عجیب", "بدهیکل", "چشم عجیب", "زشت", "بی‌ریخت", "داغون", "نصفه", "زیادی روشن", "زیادی تیره", "ویرایش‌شده", "شدید", "ضعیف", "ترسناک", "عجیب‌غریب", "مبالغه", "کاریکاتور", "شکسته", "معیوب", "نادرست", "غلط", "برعکس", "تغییریافته", "جهش‌یافته", "کم‌نور", "تاریک"],
        "positive": ["دیجیتال آرت", "نقاشی دیجیتال", "هایپررئال", "فوق‌واقعی", "فانتزی", "تاریک", "دارک", "آرت‌استیشن Artstation", "دیوینت آرت Deviant Art", "جزئیات زیاد", "باجزئیات", "فوکوس تیز", "فوکوس شارپ", "علمی‌تخیلی", "سای‌فای", "دیستوپیا", "یوتوپیا", "نورپردازی استودیو", "سینمایی", "پس‌زمینه‌ی رنگی", "کانسپت آرت", "انتزاعی", "نورپردازی دراماتیک", "دقیق", "ظریف", "اکتان رندر", "کلوس‌آپ", "باکیفیت", "کیفیت اچ‌دی HD", "شاهکار", "فول‌اچ‌دی", "خوش‌عکس", "فوتوژنیک", "انیمه", "کارتون", "بازی کامپیوتری", "ویدیو گیم", "آنریل انجین Unreal Engine", "اثر هنری", "تصویر واقعی"]
    } 
    const positive = Array.from(tagsjson.positive, (value, index) => ({id: index, tag: value}))
    const negative = Array.from(tagsjson.negative, (value, index) => ({id: index, tag: value}))
    const [tags, setTags] = useState([]);
    function addTag(tag, el) {
        document.getElementsByClassName(`tags-${mode}`)[0].querySelector('input').value = '';
        const temp = [...tags, tag]
        setTags(temp);
    }
    function removeTag(tag) {
        const index = tags.indexOf(tag);
        const temp = [...tags];
        temp.splice(index, 1)
        setTags(temp);
    }
    return (
        <div className="flex flex-col gap-1">

            {(tags.length < 5) ? (<Autocomplete
                allowsCustomValue
                menuTrigger="input"
                onSelectionChange={(text) => addTag(text, this)}
                classNames={{
                    base: "border-none p-0 "+`tags-${mode}`,
                    listboxWrapper: "max-h-[320px]",
                    listbox: "flex flex-row flex-wrap",
                    selectorButton: "text-default-foreground",
                    clearButton: "text-default-foreground"
                }}
                inputProps={{
                    classNames: {
                        inputWrapper: "h-8 min-h-8"
                    }
                }}
                popoverProps={{
                    classNames: {
                        content: "bg-default-100/100"
                    }
                }}
                listboxProps={{
                    hideSelectedIcon: true,
                    classNames: {
                        list: "flex flex-row flex-wrap"
                    },
                    itemClasses: {
                        base: [
                            "w-fit"
                        ],
                    },
                }}
                defaultItems={(mode == 'positive') ? positive : negative}
                aria-label={`${mode}-tags`}
                placeholder={(mode == 'positive') ? "راهنما" : "منفی"}
                radius="full"
                variant="flat"
                size="sm"
                className={`tags-${mode}`}
            >
                {(item) => (
                    <AutocompleteItem key={item.tag}
                        textValue={item.tag}>
                        <span className="text-small">{item.tag}</span>
                    </AutocompleteItem>
                )}
            </Autocomplete>) : ""}
            <div className="flex gap-1 flex-wrap min-h-6">
                {tags.length ? tags.map((tag) => {
                    return (
                        <>
                            <Chip key={"chip-"+tag} className="text-xs p-0.5" color={(mode == "positive") ? "primary" : "danger"} onClick={() => removeTag(tag)}>{tag}</Chip>
                            <input type="hidden" name={mode} value={tag} />
                        </>
                    )
                })
                    : ''}
            </div>
        </div>
    );
}
