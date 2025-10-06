/* Initialize */
export function init() {
    const menuList = document.querySelector('.js-main-menu-list');
    const itemObject = document.querySelector('.js-item-object');

    if (menuList && itemObject) {
        /* Remove current active item */
        const activeMenuLink = menuList.querySelector('.js-main-menu-item-link-active');
        if (activeMenuLink) {
            activeMenuLink.classList.remove('js-main-menu-item-link-active');
        }

        /* Set new active item */
        const activeMenuItemID = itemObject.dataset.activeMenuItem;
        if (activeMenuItemID) {
            const newActiveMenuItem = document.getElementById('menuItem' + activeMenuItemID);
            if (newActiveMenuItem) {
                newActiveMenuItem.classList.add('js-main-menu-item-link-active');
            }
        }
    }
}

/* Export init function */
export default {
    init
};