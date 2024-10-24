export function init(gsap, ScrollTrigger, createValidHtmlId, getCookie, stFadeIn) {
    /* Blog download */
    if(document.querySelector('.js-blog-download')) {
        stFadeIn(document.querySelectorAll('.js-blog-download'), 'self');
    }



    /* Table of contents */
    if(document.querySelector('.js-blog-single-content') && document.querySelector('.js-table-of-contents')) {
        const blogSingleContent = document.querySelector('.js-blog-single-content'),
            tablesOfContents = document.querySelectorAll('.js-table-of-contents');

        tablesOfContents.forEach(tableOfContents => {
            const oList = tableOfContents.querySelector('.js-table-of-contents-list'),
                headings = blogSingleContent.querySelectorAll('h2');

            /* Loop over headings */
            headings.forEach(heading => {
                /* Set ID */
                const headingText = heading.textContent,
                    headingID = createValidHtmlId(headingText);

                heading.setAttribute('id', headingID);

                /* Create list item */
                const listItem = document.createElement('li');

                /* Create link */
                const listItemLink = document.createElement('a');
                listItemLink.href = '#' + headingID;
                listItemLink.textContent = headingText;

                /* Append <a> to <li>, then <li> to <ol> */
                listItem.appendChild(listItemLink);
                oList.appendChild(listItem);

                /* Refresh ScrollTrigger */
                ScrollTrigger.refresh();
            });
        });
    }



    /* Blockquote */
    if(document.querySelector('.js-blockquote')) {
        stFadeIn(document.querySelectorAll('.js-blockquote'), 0);
    }



    /* Checklist */
    if(document.querySelector('.js-checklist')) {
        const checklists = document.querySelectorAll('.js-checklist');

        function setItem(item, n) {
            if(getCookie('checklist'+n) === 'true') {
                item.classList.add('js-active');
            }
        }

        function toggleItem(item, n) {
            if(item.classList.contains('js-active')) {
                item.classList.remove('js-active');

                /* Remove cookie */
                document.cookie = 'checklist'+n+'=true; max-age=0;';
            } else {
                item.classList.add('js-active');

                /* Set cookie */
                document.cookie = 'checklist'+n+'=true;';
            }
        }

        checklists.forEach(checklist => {
            const listItems = checklist.querySelectorAll('ul > li');

            listItems.forEach(function (listItem, i) {
                setItem(listItem, i);

                listItem.addEventListener("click", function() {
                    toggleItem(listItem, i);
                });
            });
        });
    }
}

/* Export init function */
export default {
    init
};