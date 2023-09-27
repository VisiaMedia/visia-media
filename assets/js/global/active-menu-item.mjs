/* Initialize */
export function init(){
    if(document.querySelector('.js-main-menu-list') && document.querySelector('.js-item-object')) {
        const menuList = document.querySelector('.js-main-menu-list');

        /* Check and remove current active item */
        if(menuList.querySelector('.js-main-menu-item-link-active')) {
            const menuItemLinkActive = menuList.querySelector('.js-main-menu-item-link-active');

            menuItemLinkActive.classList.remove('js-main-menu-item-link-active');
        }

        /* Set active item */
        if(document.querySelector('.js-item-object').dataset.activeMenuItem) {
            const activeMenuItemID = document.querySelector('.js-item-object').dataset.activeMenuItem;

            if(document.getElementById('menuItem'+activeMenuItemID)) {
                document.getElementById('menuItem'+activeMenuItemID).classList.add('js-main-menu-item-link-active')
            }
        }
    }
}

/* Export init function */
export default {
    init
};