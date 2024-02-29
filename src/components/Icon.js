export default function({name, dir}) {
    return (
        <i className={`m${(dir == 'ltr')? 'r' : 'l'}-2 text-lg fad fa-${name}`}></i> 
    )
}