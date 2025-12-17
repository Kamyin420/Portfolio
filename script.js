const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".navigatie");
const title = document.querySelector("header h3");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
    title.classList.toggle("hide");
});

// Simple collision avoidance for floating items
const floatItems = Array.from(
    document.querySelectorAll(".floater .klaus, .floater .typo, .floater .fungi, .floater .hand")
);

if (floatItems.length) {
    const offsets = new Map(floatItems.map((el) => [el, { x: 0, y: 0 }]));
    const DECAY = 0.9;
    const PUSH_MULTIPLIER = 0.25;
    const MAX_SHIFT = 40; // px

    const clamp = (val, max) => Math.max(-max, Math.min(max, val));

    const step = () => {
        // Natural decay back toward the original path
        offsets.forEach((offset) => {
            offset.x *= DECAY;
            offset.y *= DECAY;
        });

        // Detect overlaps and push items apart
        for (let i = 0; i < floatItems.length; i += 1) {
            for (let j = i + 1; j < floatItems.length; j += 1) {
                const a = floatItems[i];
                const b = floatItems[j];
                const aRect = a.getBoundingClientRect();
                const bRect = b.getBoundingClientRect();

                const overlap =
                    aRect.left < bRect.right &&
                    aRect.right > bRect.left &&
                    aRect.top < bRect.bottom &&
                    aRect.bottom > bRect.top;

                if (!overlap) continue;

                const dx = aRect.left + aRect.width / 2 - (bRect.left + bRect.width / 2);
                const dy = aRect.top + aRect.height / 2 - (bRect.top + bRect.height / 2);
                const dist = Math.hypot(dx, dy) || 1;

                const overlapX = (aRect.width + bRect.width) / 2 - Math.abs(dx);
                const overlapY = (aRect.height + bRect.height) / 2 - Math.abs(dy);
                const push = Math.min(overlapX, overlapY) * PUSH_MULTIPLIER;

                const nx = dx / dist;
                const ny = dy / dist;

                const aOffset = offsets.get(a);
                const bOffset = offsets.get(b);
                aOffset.x += nx * push;
                aOffset.y += ny * push;
                bOffset.x -= nx * push;
                bOffset.y -= ny * push;
            }
        }

        // Apply offsets
        offsets.forEach((offset, el) => {
            const x = clamp(offset.x, MAX_SHIFT);
            const y = clamp(offset.y, MAX_SHIFT);
            el.style.translate = `${x}px ${y}px`;
        });

        requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
}
