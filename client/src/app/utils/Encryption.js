const xorEncryptDecrypt = (input, secretKey)=>{
    let output = '';
    for(let i=0; i<input.length; i++){
        const inputCode = input.charCodeAt(i);
        const secretCode = secretKey.charCodeAt(i % secretKey.length)
        const xor = inputCode ^ secretCode;
        output += String.fromCharCode(xor);
    }
    return output

}
export default xorEncryptDecrypt;