import sizeBlock from './sizeBlock';
import { getColumnSpan, getRandomInt, getRowSpan } from './utils';
import { primaryBlocks, totalBlocks, blockSize } from './index';

/**
 * Size a collection of blocks
 * @param {NodeList} blocks
 */
export default function sizeAllBlocks(blocks) {
    let primaryBlockSet = [];

    // Assign random blocks as a `primary`
    for (let i = 0; i < primaryBlocks; i++) {
        let assignedPrimary = getRandomInt(0, totalBlocks - 1);

        // Do not allow duplicates
        while (primaryBlockSet.includes(assignedPrimary)) {
            assignedPrimary = getRandomInt(0, totalBlocks - 1);
        }

        // Keeping track of which blocks are `primary`
        primaryBlockSet = [...primaryBlockSet, assignedPrimary];
    }

    blocks.forEach((block, index) => {
        /**
         * If this block's index is in the primary block array
         *  then use the maximum size and exit the function.
         */
        if (primaryBlockSet.includes(index)) {
            sizeBlock(block, blockSize, blockSize);
            return;
        }

        let colSpan = getColumnSpan(blockSize);
        let rowSpan = getRowSpan(blockSize);

        // Do not allow other primary-sized blocks to be added
        while (colSpan + rowSpan === blockSize * 2) {
            if (blockSize === 1)
                break;
            colSpan = getColumnSpan(blockSize);
            rowSpan = getRowSpan(blockSize);
        }

        sizeBlock(block, colSpan, rowSpan);
    });
};
