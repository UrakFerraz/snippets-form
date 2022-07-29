import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

export default function highlightedCodeElement(code: string, language: string) {
    console.log(Prism.languages)
    console.log(language)

    const formattedToHTML = Prism.highlight(
        code,
        Prism.languages[language],
        `${language}`
    )
    return formattedToHTML
}
