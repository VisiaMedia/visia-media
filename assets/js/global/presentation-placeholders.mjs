export function init(getCookie){
    /* Replace presentation placeholders */
    if(document.querySelector('.js-presentation-first-name-placeholder') || document.querySelector('.js-presentation-business-name-placeholder')) {
        /* Function for wrapping each word in span */
        function wrapWords(str, tmpl) {
            return str.replace(/\w+/g, tmpl || '<span class="css-presentation-placeholder">$&</span>');
        }

        /* First name */
        if(document.querySelector('.js-presentation-first-name-placeholder') && getCookie('presentationFirstName')) {
            const placeholders = document.querySelectorAll('.js-presentation-first-name-placeholder');

            placeholders.forEach(placeholder => {
                const tempWrapper = document.createElement('div');
                tempWrapper.innerHTML = wrapWords(getCookie('presentationFirstName'));

                placeholder.replaceWith(...tempWrapper.childNodes);
            });
        }

        /* Business name */
        if(document.querySelector('.js-presentation-business-name-placeholder') && getCookie('presentationBusiness')) {
            const placeholders = document.querySelectorAll('.js-presentation-business-name-placeholder');

            placeholders.forEach(placeholder => {
                const tempWrapper = document.createElement('div');
                tempWrapper.innerHTML = wrapWords(getCookie('presentationBusiness'));

                placeholder.replaceWith(...tempWrapper.childNodes);
            });
        }
    }
}

/* Export init function */
export default {
    init
};