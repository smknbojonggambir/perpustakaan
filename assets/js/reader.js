/**
 * Reading Tracker
 */
class BookTracker {
    constructor(bookId, userId) {
        this.bookId = bookId;
        this.userId = userId;
        this.startTime = Date.now();
        this.lastPage = 1;
        this.timer = null;
        this.startTracking();
    }

    startTracking() {
        this.timer = setInterval(() => {
            this.syncLog();
        }, 30000); // sync every 30s
    }

    setPage(pageNumber) {
        this.lastPage = pageNumber;
    }

    async syncLog(isFinished = false) {
        const durationSec = Math.floor((Date.now() - this.startTime) / 1000);
        await API.logReading({
            userId: this.userId,
            bookId: this.bookId,
            lastPage: this.lastPage,
            duration: durationSec,
            isFinished: isFinished
        });
    }

    stopTracking() {
        if (this.timer) clearInterval(this.timer);
        this.syncLog();
    }
}
