/* Initialize */
export function init(gsap, createValidHtmlId) {
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
            });
        });
    }
}

/* Export init function */
export default {
    init
};