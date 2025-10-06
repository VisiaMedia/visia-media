export function init(getCookie) {
    /* Replace presentation placeholders */
    const firstNamePlaceholders = document.querySelectorAll('.js-presentation-first-name-placeholder');
    const businessNamePlaceholders = document.querySelectorAll('.js-presentation-business-name-placeholder');

    /* Function for wrapping each word in span */
    const wrapWords = (str, tmpl) => {
        return str.replace(/\w+/g, tmpl || '<span class="css-presentation-placeholder">$&</span>');
    };

    /* First name replacement */
    const firstName = getCookie('presentationFirstName');
    if (firstName && firstNamePlaceholders.length > 0) {
        firstNamePlaceholders.forEach(placeholder => {
            const tempWrapper = document.createElement('div');
            tempWrapper.innerHTML = wrapWords(firstName);
            placeholder.replaceWith(...tempWrapper.childNodes);
        });
    }

    /* Business name replacement */
    const businessName = getCookie('presentationBusiness');
    if (businessName && businessNamePlaceholders.length > 0) {
        businessNamePlaceholders.forEach(placeholder => {
            const tempWrapper = document.createElement('div');
            tempWrapper.innerHTML = wrapWords(businessName);
            placeholder.replaceWith(...tempWrapper.childNodes);
        });
    }
}

/* Export init function */
export default {
    init
};