function openImageGen() { document.getElementById("image-modal").style.display = "block"; }
function closeImageGen() { document.getElementById("image-modal").style.display = "none"; }

async function generateImage() {
  const prompt = document.getElementById("image-prompt").value;
  const res = await fetch("/generate-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });
  const data = await res.json();
  const container = document.getElementById("image-result");
  container.innerHTML = "";
  if(data?.[0]?.generated_image) {
    const img = document.createElement("img");
    img.src = `data:image/png;base64,${data[0].generated_image}`;
    container.appendChild(img);
  } else {
    container.innerText = "Image generation failed.";
  }
}