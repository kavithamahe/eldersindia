import { indexForItem, findReorderItem } from './item-reorder-util';
import { pointerCoord } from '../../util/dom';
import { UIEventManager } from '../../gestures/ui-event-manager';
/**
 * @private
 */
export class ItemReorderGesture {
    constructor(plt, reorderList) {
        this.plt = plt;
        this.reorderList = reorderList;
        this.selectedItemEle = null;
        this.events = new UIEventManager(plt);
        this.events.pointerEvents({
            element: this.reorderList.getNativeElement(),
            pointerDown: this.onDragStart.bind(this),
            pointerMove: this.onDragMove.bind(this),
            pointerUp: this.onDragEnd.bind(this),
            zone: false
        });
    }
    onDragStart(ev) {
        if (this.selectedItemEle) {
            return false;
        }
        let reorderElement = ev.target;
        if (reorderElement.nodeName !== 'ION-REORDER') {
            return false;
        }
        let reorderMark = reorderElement['$ionComponent'];
        if (!reorderMark) {
            console.error('ion-reorder does not contain $ionComponent');
            return false;
        }
        this.reorderList._reorderPrepare();
        let item = reorderMark.getReorderNode();
        if (!item) {
            console.error('reorder node not found');
            return false;
        }
        ev.preventDefault();
        // Preparing state
        this.selectedItemEle = item;
        this.selectedItemHeight = item.offsetHeight;
        this.lastYcoord = -100;
        this.lastToIndex = indexForItem(item);
        this.windowHeight = this.plt.height() - AUTO_SCROLL_MARGIN;
        this.lastScrollPosition = this.reorderList._scrollContent(0);
        this.offset = pointerCoord(ev);
        this.offset.y += this.lastScrollPosition;
        item.classList.add(ITEM_REORDER_ACTIVE);
        this.reorderList._reorderStart();
        return true;
    }
    onDragMove(ev) {
        let selectedItem = this.selectedItemEle;
        if (!selectedItem) {
            return;
        }
        ev.preventDefault();
        // Get coordinate
        let coord = pointerCoord(ev);
        let posY = coord.y;
        // Scroll if we reach the scroll margins
        let scrollPosition = this.scroll(posY);
        // Only perform hit test if we moved at least 30px from previous position
        if (Math.abs(posY - this.lastYcoord) > 30) {
            let overItem = this.itemForCoord(coord);
            if (overItem) {
                let toIndex = indexForItem(overItem);
                if (toIndex !== undefined && (toIndex !== this.lastToIndex || this.emptyZone)) {
                    let fromIndex = indexForItem(selectedItem);
                    this.lastToIndex = toIndex;
                    this.lastYcoord = posY;
                    this.emptyZone = false;
                    this.reorderList._reorderMove(fromIndex, toIndex, this.selectedItemHeight);
                }
            }
            else {
                this.emptyZone = true;
            }
        }
        // Update selected item position
        let ydiff = Math.round(posY - this.offset.y + scrollPosition);
        selectedItem.style[this.plt.Css.transform] = `translateY(${ydiff}px)`;
    }
    onDragEnd(ev) {
        let selectedItem = this.selectedItemEle;
        if (!selectedItem) {
            return;
        }
        if (ev) {
            ev.preventDefault();
            ev.stopPropagation();
        }
        let toIndex = this.lastToIndex;
        let fromIndex = indexForItem(selectedItem);
        let reorderInactive = () => {
            this.selectedItemEle.style.transition = '';
            this.selectedItemEle.classList.remove(ITEM_REORDER_ACTIVE);
            this.selectedItemEle = null;
        };
        if (toIndex === fromIndex) {
            selectedItem.style.transition = 'transform 200ms ease-in-out';
            setTimeout(reorderInactive, 200);
        }
        else {
            reorderInactive();
        }
        this.reorderList._reorderEmit(fromIndex, toIndex);
    }
    itemForCoord(coord) {
        const x = this.offset.x - 100;
        const y = coord.y;
        const element = this.plt.getElementFromPoint(x, y);
        return findReorderItem(element, this.reorderList.getNativeElement());
    }
    scroll(posY) {
        if (posY < AUTO_SCROLL_MARGIN) {
            this.lastScrollPosition = this.reorderList._scrollContent(-SCROLL_JUMP);
        }
        else if (posY > this.windowHeight) {
            this.lastScrollPosition = this.reorderList._scrollContent(SCROLL_JUMP);
        }
        return this.lastScrollPosition;
    }
    /**
     * @private
     */
    destroy() {
        this.onDragEnd(null);
        this.events.destroy();
        this.events = null;
        this.reorderList = null;
    }
}
const AUTO_SCROLL_MARGIN = 60;
const SCROLL_JUMP = 10;
const ITEM_REORDER_ACTIVE = 'reorder-active';
//# sourceMappingURL=item-reorder-gesture.js.map