export function quakeCountDown(): void {
    const defaultQuakeTime: number = 10.03;
    const MILLISECOND: number = 0.001;  
    let quakeTime: number = defaultQuakeTime;
    const quakeTimeElement: HTMLElement | null = document.getElementById('quake_time');

    if (!quakeTimeElement) {
        console.error("Element with ID 'quake_time' not found.");
        return;
    }

    const firstIntervalId: number = window.setInterval(() => {
        quakeTimeElement.innerText = quakeTime.toFixed(2);
        quakeTime -= 10 * MILLISECOND;

        if (quakeTime < 0) {
            clearInterval(firstIntervalId);
        }
    }, 10);
}