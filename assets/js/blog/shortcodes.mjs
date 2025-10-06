export function init(gsap, ScrollTrigger, createValidHtmlId, getCookie, stFadeIn) {
    /* Blog download */
    const blogDownloadElems = document.querySelectorAll('.js-blog-download');
    if (blogDownloadElems.length > 0) {
        stFadeIn(blogDownloadElems, 'self');
    }

    /* Table of contents */
    const blogSingleContent = document.querySelector('.js-blog-single-content');
    const tablesOfContents = document.querySelectorAll('.js-table-of-contents');

    if (blogSingleContent && tablesOfContents.length > 0) {
        const headings = blogSingleContent.querySelectorAll('h2');

        tablesOfContents.forEach(tableOfContents => {
            const oList = tableOfContents.querySelector('.js-table-of-contents-list');

            headings.forEach(heading => {
                /* Set ID */
                const headingText = heading.textContent;
                const headingID = createValidHtmlId(headingText);

                heading.setAttribute('id', headingID);

                /* Create and append list item */
                const listItem = document.createElement('li');
                const listItemLink = document.createElement('a');
                listItemLink.href = `#${headingID}`;
                listItemLink.textContent = headingText;

                listItem.appendChild(listItemLink);
                oList.appendChild(listItem);
            });

            /* Refresh ScrollTrigger after setting IDs */
            ScrollTrigger.refresh();
        });
    }

    /* Blockquote */
    const blockquoteElems = document.querySelectorAll('.js-blockquote');
    if (blockquoteElems.length > 0) {
        stFadeIn(blockquoteElems, 0);
    }

    /* Checklist */
    const checklists = document.querySelectorAll('.js-checklist');

    if (checklists.length > 0) {
        checklists.forEach(checklist => {
            const listItems = checklist.querySelectorAll('ul > li');

            listItems.forEach((listItem, i) => {
                const cookieName = `checklist${i}`;

                /* Set item state based on cookie */
                if (getCookie(cookieName) === 'true') {
                    listItem.classList.add('js-active');
                }

                /* Toggle item and cookie on click */
                listItem.addEventListener('click', () => {
                    const isActive = listItem.classList.toggle('js-active');
                    document.cookie = `${cookieName}=true; max-age=${isActive ? '31536000' : '0'};`;
                });
            });
        });
    }
}

/* Export init function */
export default {
    init
};