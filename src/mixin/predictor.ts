export const predict = (odd: any): any => {
    const odds = odd.split('.');
    const one = odds[0] + '.' + odds[1].slice(0, 2);
    const two = odds[2].slice(2) + '.' + odds[3];
    const home = parseFloat(one);
    const away = parseFloat(two);
    
    // Win
    if(home >= 1.01 && home <= 1.40) {
       return '1'
    }
    if(away >= 1.01 && away < 1.60) {
       return '2'
    }
    // Double Chance Home
    if(home >= 1.75 && home <= 1.88) {
       return '1X'
    }
    // Double Chance Away
    if(away >= 1.75 && away <= 1.88) {
       return 'X2'
    }
    // Double Chance Away & Home
    if(away > 2 && away < 2.90 || home > 2 && home < 2.90) {
       return '12'
    }
   //  Under3.5 Goals
    if(home >= 3 && home <= 3.70 || home >= 3 && home < 3.90) {
       return 'un3.5'
    }
    // Over2.5 Goals
    if(home >= 1.89 && home <= 2.00) {
       return 'ov1.5'
    }
    // Over2.5 Goals
    if(away >= 1.89 && away <= 2.00) {
       return 'ov1.5'
    }
    // Over2.5 Goals
    if(home >= 1.41 && home < 1.60) {
       return 'ov2.5'
    }
    // Over2.5 Goals
    if(away >= 1.41 && away < 1.60) {
       return 'ov2.5'
    }
    // BTTS/GG
    if(home >= 3.71 && home <= 5.20) {
       return 'BTTS/GG'
    }
    // BTTS/GG
    if(away >= 3.71 && away <= 5.20) {
       return 'BTTS/GG'
    }
}