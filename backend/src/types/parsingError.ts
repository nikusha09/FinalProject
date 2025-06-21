export interface ParsingError {
  lineNumber: number;
  message: string;
  type: 'MissingTitle' | 'MissingIngredient' | 'MissingStep' | 'InvalidLineFormat' | 'InvalidQuantity';
}