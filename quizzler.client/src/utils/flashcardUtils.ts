export function generateMultipleChoiceOptions(
    correctAnswer: string, 
    allAnswers: string[], 
    numOptions: number = 4): string[] {
    if (allAnswers.length < 4) {
        numOptions = allAnswers.length;
    }
    const options = new Set<string>();
    options.add(correctAnswer);
    while (options.size < numOptions) {
        const randomIndex = Math.floor(Math.random() * allAnswers.length);
        options.add(allAnswers[randomIndex]);
    }
    
    // Convert to array and shuffle using Fisher-Yates algorithm
    const shuffled = Array.from(options);
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
}