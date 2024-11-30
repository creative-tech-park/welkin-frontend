<template>
  <div
    v-if="customCakeStore.isViewTSModalOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white rounded-lg p-5 w-3/4 md:w-1/2">
      <h2 class="text-lg font-bold">360 View</h2>

      <div
        class="car-360-view"
        tabindex="0"
        @keydown="handleKeydown"
        @mousedown="onMouseDown"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <div class="image-container">
          <img :src="currentImage" alt="Car View" />
        </div>
        <div class="controls">
          <button @click="rotateLeft">Rotate Left</button>
          <button @click="rotateRight">Rotate Right</button>
        </div>
      </div>

      <button
        @click="customCakeStore.closeVTSModal"
        class="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useCustomCakeStore } from "@/stores/customCakeStore.js";

const customCakeStore = useCustomCakeStore();

// Array of car images in the correct order (front, right, back, left)
const carImages = [
  "/images/front.jfif",
  "/images/right.jfif",
  "/images/back.jfif",
  "/images/left.jfif",
];

// Track the current image index
const currentIndex = ref(0);

// Get the current image
const currentImage = computed(() => carImages[currentIndex.value]);

// Rotate left (counterclockwise)
const rotateLeft = () => {
  currentIndex.value =
    (currentIndex.value - 1 + carImages.length) % carImages.length;
};

// Rotate right (clockwise)
const rotateRight = () => {
  currentIndex.value = (currentIndex.value + 1) % carImages.length;
};

// Keyboard navigation
const handleKeydown = (event) => {
  if (event.key === "ArrowRight") {
    rotateRight();
  } else if (event.key === "ArrowLeft") {
    rotateLeft();
  }
};

// Mouse drag control
let isDragging = false;
let startX = 0;

const onMouseDown = (event) => {
  isDragging = true;
  startX = event.clientX;

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};

const onMouseMove = (event) => {
  if (!isDragging) return;
  const deltaX = event.clientX - startX;

  if (deltaX > 50) {
    rotateLeft();
    startX = event.clientX; // Reset the start position
  } else if (deltaX < -50) {
    rotateRight();
    startX = event.clientX; // Reset the start position
  }
};

const onMouseUp = () => {
  isDragging = false;
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
};

// Touch gesture controls
let touchStartX = 0;

const onTouchStart = (event) => {
  touchStartX = event.touches[0].clientX;
};

const onTouchMove = (event) => {
  event.preventDefault();
};

const onTouchEnd = (event) => {
  const touchEndX = event.changedTouches[0].clientX;
  const deltaX = touchEndX - touchStartX;

  if (deltaX > 50) {
    rotateLeft(); // Swipe right to rotate left
  } else if (deltaX < -50) {
    rotateRight(); // Swipe left to rotate right
  }
};

// Auto-play feature
let autoplayInterval = null;

const startAutoPlay = () => {
  autoplayInterval = setInterval(() => {
    rotateRight(); // Move to the next image
  }, 3000); // Change image every 3 seconds
};

// Clear the autoplay interval
const stopAutoPlay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
};
startAutoPlay();

// Automatically focus on the car view div and start autoplay
onMounted(() => {
  document.querySelector(".car-360-view").focus();
});

// Stop autoplay when modal is closed
onUnmounted(() => {
  stopAutoPlay();
});
</script>

<style scoped>
.car-360-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  outline: none; /* Required for focusing */
}

.image-container {
  width: auto;
  height: auto;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.controls {
  margin-top: 10px;
}

button {
  margin: 0 10px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
-> why auto play is not working even alert is not showing
