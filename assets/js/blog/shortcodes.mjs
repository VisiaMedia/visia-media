/* Initialize */
export function init(gsap, ScrollTrigger, createValidHtmlId, getCookie) {
    /* Blog download */
    if(document.querySelector('.js-blog-download')) {
        const blogDownloads = document.querySelectorAll('.js-blog-download');

        blogDownloads.forEach(blogDownload => {
            /* Add reveal animation */
            gsap.set(blogDownload, {
                autoAlpha:0,
                y: "1.5rem"
            });

            gsap.to(blogDownload, {
                autoAlpha: 1,
                y: "0rem",
                scrollTrigger: {
                    trigger: blogDownload,
                    start: "top 75%",
                    once: true,
                    refreshPriority: blogDownload.dataset.stCount
                }
            });
        });
    }



    /* Table of contents */
    if(document.querySelector('.js-blog-single') && document.querySelector('.js-table-of-contents')) {
        const blogSingle = document.querySelector('.js-blog-single'),
            tablesOfContents = document.querySelectorAll('.js-table-of-contents');

        tablesOfContents.forEach(tableOfContents => {
            const oList = tableOfContents.querySelector('.js-table-of-contents-list'),
                headings = blogSingle.querySelectorAll('h2');

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
        const blockQuotes = document.querySelectorAll('.js-blockquote');

        blockQuotes.forEach(blockQuote => {
            gsap.set(blockQuote, {
                autoAlpha:0,
                y: "1.5rem"
            });

            gsap.to(blockQuote, {
                autoAlpha: 1,
                y: "0rem",
                scrollTrigger: {
                    trigger: blockQuote,
                    start: "top 75%",
                    once: true
                }
            });
        });
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