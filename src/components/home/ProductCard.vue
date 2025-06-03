<template>
  <div
    class="rtl cursor-pointer relative rounded-[8px] border border-gray-200 bg-base-default px-3 py-4 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full"
  >
    <!-- ❤️ Heart Button -->
    <button
      class="absolute top-3 right-3 bg-white shadow-md rounded-[8px] p-1 flex items-center justify-center"
    >
      <img
        src="../../assets/images/heart-filled.png"
        class="w-7 h-7"
        alt="heart"
      />
    </button>

    <!-- 🛒 Cart Button -->
    <button
      class="absolute top-32 right-3 bg-white rounded-[8px] p-2 flex items-center justify-center shadow-sm"
    >
      <img src="../../assets/images/shop-cart.png" class="w-7 h-7" alt="cart" />
    </button>

    <!-- 🔔 Label Button -->
    <button
      class="absolute top-35 left-3 bg-white rounded-[8px] p-1 flex items-center justify-center shadow-sm"
    >
      <span class="text-natural-secondary font-[600]">5.5</span>
      <img src="../../assets/images/star.png" class="w-4 h-4" alt="star" />
    </button>

    <!-- 💬 Discount Button -->
    <button
      class="absolute top-3 left-3 miswag-bg-red-primary text-white shadow-md rounded-full px-1 flex items-center justify-center"
    >
      <span>%20</span>
    </button>

    <!-- 📸 Image -->
    <div
      class="flex justify-center items-center h-40 mb-2 bg-white rounded-[8px] overflow-hidden"
    >
      <img
        src="https://i5.walmartimages.com/seo/Restored-Apple-iPhone-15-Pro-1TB-Verizon-Blue-Titanium-MTU63LL-A-Excellent-Condition_33e31ea7-b89b-4739-85a3-76653b0ca3b3.5e4d42d7e7f8fd63e1bc0121c5052122.jpeg"
        alt="product"
        class="object-contain max-h-full p-4"
      />
    </div>

    <!-- 📜 Title -->
    <h2
      class="text-[15px] leading-snug font-medium text-gray-800 mb-1 text-right truncate"
    >
      ابل سماعة ابل ايربودز برو مثال مثال للحجي للحجي (الجيل الثاني)
    </h2>

    <!-- 💰 Price -->
    <div class="text-right text-[#141414] !font-bold text-lg mb-1">
      450,000 د.ع
    </div>

    <div class="flex justify-between items-end">
      <!-- Colors circles stack -->
      <div class="flex justify-between items-center">
        <div class="flex flex-col items-center gap-1 bg-white">
          <div class="flex flex-col -space-y-2 bg-white">
            <!-- First 3 color circles -->
            <div
              class="w-5 h-5 rounded-full bg-red-500 border border-white"
            ></div>
            <div
              class="w-5 h-5 rounded-full bg-blue-500 border border-white"
            ></div>
            <div
              class="w-5 h-5 rounded-full bg-green-500 border border-white"
            ></div>
            <div class="w-5 h-5 rounded-full bg-white border border-white">
              +2
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-end">
        <div class="flex items-end flex-col justify-between mt-3">
          <div class="flex items-center gap-1 text-sm text-gray-600 mb-2">
            <span
              class="font-bold text-natural-secondary line-through text-base-tertiary"
              v-if="true"
              >Test</span
            >
          </div>
        </div>

        <!-- 🎁 Badge + seller -->
        <div class="flex items-end flex-col justify-between mt-1">
          <div class="flex items-center gap-1 text-sm text-gray-600 mb-2">
            <span class="font-bold text-natural-secondary">هدية</span>
            <img src="../../assets/images/gift.png" class="w-5 h-5" alt="bag" />
          </div>
        </div>

        <div
          class="bg-black flex items-center gap-1 text-white text-sm rounded-full px-2 py-0.5 font-semibold"
        >
          <span>TechZone</span>
          <img
            src="../../assets/images/paper-bag.png"
            class="w-5 h-5"
            alt="bag"
          />
        </div>
      </div>
    </div>
  </div>
</template>
