$(document).ready(function () {

    document.addEventListener('DOMContentLoaded', function () {
        var jumbotron = document.querySelector('.full-page-jumbotron');
        var video = document.querySelector('.video-background');
        var progressBar = document.querySelector('.progress-bar');
        var canScrub = false; // Flag to control scrubbing

        // Event listener for when the video can play through without buffering
        video.addEventListener('canplaythrough', function () {
            canScrub = true;
        });

        var debounceTimeout;
        var debounceInterval = 10; // milliseconds

        jumbotron.addEventListener('mousemove', function (e) {
            if (!canScrub) {
                return; // Don't do anything if the video isn't ready
            }

            // Clear the timeout on every mouse move
            clearTimeout(debounceTimeout);

            // Set a timeout to prevent the function from running on every mouse move
            debounceTimeout = setTimeout(function () {
                var percent = e.offsetX / jumbotron.offsetWidth;
                var scrubTime = percent * video.duration;

                if (isFinite(scrubTime)) { // Only proceed if scrubTime is finite
                    video.currentTime = scrubTime;
                    progressBar.style.width = percent * 100 + '%';
                    progressBar.style.display = 'block';
                }
            }, debounceInterval);
        });

        jumbotron.addEventListener('mouseleave', function (e) {
            progressBar.style.display = 'none';
            if (canScrub) {
                video.play();
            }
        });
    });

});