// Objeto para almacenar los intervalos de cada cronómetro
let intervals = {};

/**
 * Inicia un cronómetro
 * @param {number} minutes - Minutos iniciales.
 * @param {string} elementId - ID del elemento HTML donde se muestra el tiempo.
 */
function startTimer(minutes, elementId) {
    // Detener el cronómetro si ya está en ejecución
    if (intervals[elementId]) {
        clearInterval(intervals[elementId]);
    }
    
    let time = minutes * 60;
    const timerDisplay = document.getElementById(elementId);
    
    intervals[elementId] = setInterval(() => {
        const mins = Math.floor(time / 60).toString().padStart(2, '0');
        const secs = (time % 60).toString().padStart(2, '0');
        timerDisplay.textContent = `${mins}:${secs}`;
        
        if (time <= 0) {
            clearInterval(intervals[elementId]);
            alert(`¡Tiempo terminado! (${minutes} minutos)`);
        } else {
            time--;
        }
    }, 1000);
}

/**
 * Reinicia un cronómetro a su valor inicial
 * @param {number} minutes - Minutos iniciales.
 * @param {string} elementId - ID del elemento HTML.
 */
function resetTimer(minutes, elementId) {
    clearInterval(intervals[elementId]);
    document.getElementById(elementId).textContent = 
        `${minutes.toString().padStart(2, '0')}:00`;
}