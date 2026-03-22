// 32-bit unique delimiter: unlikely to appear in any real text binary
const DELIMITER = "11111110111111101111111011111110";

function textToBinary(text) {
  let binary = "";
  for (let i = 0; i < text.length; i++) {
    binary += text.charCodeAt(i).toString(2).padStart(8, "0");
  }
  return binary + DELIMITER;
}

function binaryToText(binary) {
  const delimIdx = binary.indexOf(DELIMITER);
  if (delimIdx === -1) return ""; // no delimiter found = not a stego image
  const messageBits = binary.substring(0, delimIdx);
  let result = "";
  for (let i = 0; i + 8 <= messageBits.length; i += 8) {
    const charCode = parseInt(messageBits.substr(i, 8), 2);
    result += String.fromCharCode(charCode);
  }
  return result;
}
