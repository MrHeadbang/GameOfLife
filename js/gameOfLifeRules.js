function isEdge(MATRIX_HEIGHT_VALUE, MATRIX_WIDTH_VALUE, MATRIX) {
    let MATRIX_HEIGHT = MATRIX.length;
    let MATRIX_WIDTH = MATRIX[0].length;
    if (MATRIX_HEIGHT_VALUE == 0 || MATRIX_WIDTH_VALUE == 0)
        return true;
    if (MATRIX_HEIGHT_VALUE == MATRIX_HEIGHT - 1 || MATRIX_WIDTH_VALUE == MATRIX_WIDTH_VALUE - 1)
        return true;
    return false;
}
function getEdgeNeighbours(pixelHeightCoord, pixelWidthCoord, MATRIX) {
    let MATRIX_HEIGHT = MATRIX.length;
    let MATRIX_WIDTH = MATRIX[0].length;


    if(pixelHeightCoord == 0 && pixelWidthCoord == 0) {


        //LEFT TOP
        let neighbours = [
            MATRIX[pixelHeightCoord][pixelWidthCoord + 1],
            MATRIX[pixelHeightCoord + 1][pixelWidthCoord],
            MATRIX[pixelHeightCoord + 1][pixelWidthCoord + 1]
        ];
        return neighbours;
    } else if(pixelHeightCoord == MATRIX_HEIGHT - 1 && pixelWidthCoord == MATRIX_WIDTH - 1) {

        //RIGHT BOTTOM
        let neighbours = [
            MATRIX[pixelHeightCoord][pixelWidthCoord - 1],
            MATRIX[pixelHeightCoord - 1][pixelWidthCoord],
            MATRIX[pixelHeightCoord - 1][pixelWidthCoord - 1]
        ];
        return neighbours;
    } else if(pixelHeightCoord == MATRIX_HEIGHT - 1 && pixelWidthCoord == 0) {


        //LEFT BOTTOM
        let neighbours = [
            MATRIX[pixelHeightCoord - 1][pixelWidthCoord],
            MATRIX[pixelHeightCoord - 1][pixelWidthCoord + 1],
            MATRIX[pixelHeightCoord][pixelWidthCoord + 1]
        ];
        return neighbours;
    } else if(pixelHeightCoord == 0 && pixelWidthCoord == MATRIX_WIDTH - 1) {


        //RIGHT TOP
        let neighbours = [
            MATRIX[pixelHeightCoord][pixelWidthCoord - 1],
            MATRIX[pixelHeightCoord + 1][pixelWidthCoord - 1],
            MATRIX[pixelHeightCoord + 1][pixelWidthCoord]
        ];
        return neighbours;
    } else if (pixelHeightCoord == 0) {


        //TOP BORDER
        let neighbours = [
            MATRIX[pixelHeightCoord][pixelWidthCoord - 1],
            MATRIX[pixelHeightCoord][pixelWidthCoord + 1],
            MATRIX[pixelHeightCoord + 1][pixelWidthCoord],
            MATRIX[pixelHeightCoord + 1][pixelWidthCoord + 1],
            MATRIX[pixelHeightCoord + 1][pixelWidthCoord - 1]
        ];
        return neighbours;
    } else if (pixelHeightCoord == MATRIX_HEIGHT - 1) {


        //BOTTOM BORDER
        let neighbours = [
            MATRIX[pixelHeightCoord][pixelWidthCoord - 1],
            MATRIX[pixelHeightCoord][pixelWidthCoord + 1],
            MATRIX[pixelHeightCoord - 1][pixelWidthCoord],
            MATRIX[pixelHeightCoord - 1][pixelWidthCoord + 1],
            MATRIX[pixelHeightCoord - 1][pixelWidthCoord - 1]
        ];
        return neighbours;
    } else if (pixelWidthCoord == 0) {


        //LEFT BORDER
        let neighbours = [
            MATRIX[pixelHeightCoord][pixelWidthCoord + 1],
            MATRIX[pixelHeightCoord - 1][pixelWidthCoord],
            MATRIX[pixelHeightCoord + 1][pixelWidthCoord],
            MATRIX[pixelHeightCoord - 1][pixelWidthCoord + 1],
            MATRIX[pixelHeightCoord + 1][pixelWidthCoord + 1]
        ];
        return neighbours;
    } else if (pixelWidthCoord == MATRIX_WIDTH - 1) {


        //RIGHT BORDER
        let neighbours = [
            MATRIX[pixelHeightCoord][pixelWidthCoord - 1],
            MATRIX[pixelHeightCoord - 1][pixelWidthCoord],
            MATRIX[pixelHeightCoord + 1][pixelWidthCoord],
            MATRIX[pixelHeightCoord - 1][pixelWidthCoord - 1],
            MATRIX[pixelHeightCoord + 1][pixelWidthCoord - 1]
        ];
        return neighbours;
    }
    return 0;
}


function getNeighbours(pixelHeightCoord, pixelWidthCoord, MATRIX) {
    let MATRIX_HEIGHT = MATRIX.length;
    let MATRIX_WIDTH = MATRIX[0].length;

    if (!isEdge(pixelHeightCoord, pixelWidthCoord, MATRIX)) {
        let neighbours = [
            MATRIX[pixelHeightCoord - 1][pixelWidthCoord],
            MATRIX[pixelHeightCoord - 1][pixelWidthCoord - 1],
            MATRIX[pixelHeightCoord - 1][pixelWidthCoord + 1],
            MATRIX[pixelHeightCoord][pixelWidthCoord + 1],
            MATRIX[pixelHeightCoord][pixelWidthCoord - 1],
            MATRIX[pixelHeightCoord + 1][pixelWidthCoord],
            MATRIX[pixelHeightCoord + 1][pixelWidthCoord - 1],
            MATRIX[pixelHeightCoord + 1][pixelWidthCoord + 1]
        ];
        return neighbours;
    } else {
        return getEdgeNeighbours(pixelHeightCoord, pixelWidthCoord, MATRIX);
    }
}
function deadoralive(height, width, MATRIX) {
    let neighbours = getNeighbours(height, width, MATRIX);
    let alives = neighbours.filter(x => x == 1).length;
    let cell = MATRIX[height][width];
    if (cell == 0 && alives == 3)
        return 1;
    if ((cell == 1 && alives < 2) || (cell == 1 && alives > 3))
        return 0;

    if ((cell == 1 && alives == 2) ||(cell == 1 && alives == 3))
        return 1;
    return cell;
}

function NEXT_MATRIX(MATRIX) {
    let output = new Array();
    for (let h = 0; h < MATRIX.length; h++) {
        let tmp = new Array();
        for (let w = 0; w < MATRIX[0].length; w++) {
            let cell = deadoralive(h, w, MATRIX);
            tmp.push(cell);
        }
        output.push(tmp);
    }
    return output;
}