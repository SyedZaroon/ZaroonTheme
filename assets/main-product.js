document.addEventListener("DOMContentLoaded", () => {
  const productPrice = document.querySelector(".product-price");

  const variantPicker = document.querySelector(".variant-picker");
  if (!variantPicker) return;

  // Get full product object with all variants
  const productData = JSON.parse(
    variantPicker.closest(".main-product").dataset.productJson
  );

  function handleVariantChange() {
    // 1️⃣ Get selected values
    const selectedValues = Array.from(
      variantPicker.querySelectorAll("input[type='radio']:checked")
    ).map((input) => input.value);

    // 2️⃣ Find matching variant based on options
    const selectedVariant = productData.variants.find((variant) => {
      return variant.options.every(
        (option, index) => option === selectedValues[index]
      );
    });

    if (selectedVariant) {
      console.log("✅ Selected Variant ID:", selectedVariant.id);
      console.log("✅ Full Variant Object:", selectedVariant);

      // 3️⃣ (Optional) Update hidden input so Shopify Add-to-Cart works
      const hiddenInput = variantPicker.querySelector("#hidden-id");
      if (hiddenInput) hiddenInput.value = selectedVariant.id;

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("variant", selectedVariant.id);
      window.history.replaceState({}, "", newUrl);

      const priceElement = document.querySelector(".product-price");
      priceElement.textContent = selectedVariant.price;

      const productSku = document.querySelector(".product-sku");
      productSku.textContent = selectedVariant.sku;
    }
  }

  // Run on page load
  handleVariantChange();

  // Listen for change event
  variantPicker.addEventListener("change", handleVariantChange);
});
