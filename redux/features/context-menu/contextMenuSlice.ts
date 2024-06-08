// public
import { createSlice } from '@reduxjs/toolkit';

// types
import { ContextMenuTypes } from '@/types/types';
import { MenuPositionTypes } from '@/types/types';

//* initial state
const initialState: ContextMenuTypes = {
    menuName: 'tasks',
    itemData: {
        id: '',
    },
    isShownMenu: false,
    menuPosition: {
        x: 0,
        y: 0,
        XAxisSide: 'left',
        YAxisSide: 'top',
    },
};

//* reducer
const contextMenuSlice = createSlice({
    name: 'contextMenu',
    initialState,
    reducers: {
        setMenuName: (state, action) => {
            state.menuName = action.payload;
        },
        setItemData: (state, action) => {
            state.itemData = action.payload;
        },
        setIsShownMenu: (state, action) => {
            state.isShownMenu = action.payload;
        },
        setMenuPosition: (state, action) => {
            // data and variables
            const { x, y, innerWidth, innerHeight } = action.payload;
            const position: MenuPositionTypes = {
                x,
                y,
                XAxisSide: 'left',
                YAxisSide: 'top',
            };

            // Checking whether the menu falls out of the page or not
            if (innerHeight - y < 200) {
                position.YAxisSide = 'bottom';
                position.y = innerHeight - y;
            }
            if (innerWidth - x < 200) {
                position.XAxisSide = 'right';
                position.x = innerWidth - x;
            }

            state.menuPosition = position;
        },
    },
});

export const { setMenuName, setItemData, setIsShownMenu, setMenuPosition } =
    contextMenuSlice.actions;
export default contextMenuSlice.reducer;
