export const sleep = async(n: number = 1) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(n);
        }, n*1000);
    });
};