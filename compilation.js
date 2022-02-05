/* ========== Recopilación de funciones ========== */

const rotate = (matrix, direction) => {
    /*
        Función para rotar matrices cuadradas 90º
         - horario (direction = "clockwise")
         - antihorario (direction = "counter-clockwise")

        input: [
                    [1, 2, 3, 4],
                    [5, 6, 7, 8],
                    [9, 10, 11, 12],
                    [13, 14, 15, 16]
                ], "clockwise"
        output: [
                    [ 13, 9, 5, 1 ],
                    [ 14, 10, 6, 2 ],
                    [ 15, 11, 7, 3 ],
                    [ 16, 12, 8, 4 ]
                ]
    */
    const transpose = matrixInput => {
        let transposedMatrix = JSON.parse(JSON.stringify(matrixInput));
        matrixInput.forEach((child, idx) => child.forEach((num, childIdx) => transposedMatrix[childIdx][idx] = num));
        return transposedMatrix;
    }
    const reverse = matrixInput => matrixInput.map(row => row.reverse())

    if (direction === "clockwise") return reverse(transpose(matrix));
    else if (direction === "counter-clockwise") return transpose(reverse(matrix));
}

const uniquePathsIII = function (grid) {
    /*
        https://leetcode.com/problems/unique-paths-iii/
        
        Función que devuelve el número de posibles caminos
        que pasan por todas las casillas de una matriz donde
        solo puede haber una salida (1) una meta (2) y varias
        casillas restringidas (-1)

        input: [[1,0,0,0],
                [0,0,0,0],
                [-1,-1,0,2]]
        output: 1
    */

    // Este será el output
    let uniquePaths = [];

    // Matriz m × n
    const m = grid.length,
        n = grid[0].length,
        zeros = grid.join(',').split(',').map(Number).filter(e => !e).length;

    // (row,col)
    let start = grid.find(array => array.includes(1));
    start = [grid.indexOf(start), start.indexOf(1)];

    // Función que devuelve el tipo de square
    const stepType = coord => grid[coord[0]][coord[1]];

    // Función que devuelve los posibles caminos a seguir
    const getPossibleSteps = (coord, stepsVisited) => {
        let outputArray = [];
        [[1, 0], [0, 1], [-1, 0], [0, -1]].forEach(e => outputArray.push([coord[0] + e[0], coord[1] + e[1]]));

        // Filtramos los que están fuera de la matriz
        outputArray = outputArray.filter(step => (!step.includes(-1) && step[0] < m && step[1] < n && stepType(step) !== -1 && stepType(step) !== 1 && !stepsVisited.map(JSON.stringify).includes(JSON.stringify(step))))

        return outputArray;
    }

    // Función que se itera
    const walk = (coord, stepsVisited) => {
        // Actualizamos los ya visitados
        stepsVisited.push(coord);

        // Compruebo si estoy en la meta
        if (stepType(coord) === 2) {
            if (stepsVisited.length === zeros + 2) {
                uniquePaths.push(stepsVisited);
                return;
            }
            else return;
        }

        // Podemos movernos por aquí
        let possibleSteps = getPossibleSteps(coord, stepsVisited);

        // Si hay varias posibilidades, quitamos la meta
        if (possibleSteps.length > 1) {
            possibleSteps = possibleSteps.filter(step => stepType(step) !== 2)

            // Y recorremos todas las posibles
            possibleSteps.forEach(newCoord => {
                let stepsVisitedCopy = [...stepsVisited];
                walk(newCoord, stepsVisitedCopy);
            })
        }

        // Si no hay posibilidades (te has chocao)
        else if (possibleSteps.length === 0) {
            return;
        }

        // Solo hay una posibilidad (pues nos movemos a ella)
        else walk(possibleSteps[0], stepsVisited)
    }

    walk(start, []);

    console.log("uniquePaths:", uniquePaths)
    return uniquePaths.length;
};