import BlackHeroes from "../Constants/BlackHeroes";
import BlueHeroes from "../Constants/BlueHeroes";
import GreenHeroes from "../Constants/GreenHeroes";
import RedHeroes from "../Constants/RedHeroes";
import { ICard, IHero } from "../Interfaces/Deck";

export default class CardUtilities {
  public static GetCardAmountInDeck(cards: ICard[]): number {
    let cardAmount = 0;
    cards.forEach(card => (cardAmount += card.cardAmountInDeck));
    return cardAmount;
  }
  public static GetAllHeroes(): IHero[] {
    const heroArrays = {
      blackHeroes: this.getHeroesFromExport(BlackHeroes),
      blueHeroes: this.getHeroesFromExport(BlueHeroes),
      greenHeroes: this.getHeroesFromExport(GreenHeroes),
      redHeroes: this.getHeroesFromExport(RedHeroes)
    };
    const allHeroes: IHero[] = [];
    Object.keys(heroArrays).forEach((heroArray: string) =>
      allHeroes.push(...heroArrays[heroArray])
    );
    return allHeroes;
  }
  public static GetDeckHeroes(cards: ICard[]): IHero[] {
    const signatureCards = this.GetSignatureCardsFromDeck(cards);
    const amountOfSignatureCardsPerHero = 3;
    const dividedCards = [];
    if (signatureCards.length < 5) {
      // One deck has one hero multiple times
      // Find multiple signature cards
      signatureCards.forEach(card => {
        if (card.cardAmountInDeck > amountOfSignatureCardsPerHero) {
          const heroAmount =
            card.cardAmountInDeck / amountOfSignatureCardsPerHero;
          for (let i = 0; i < heroAmount; i++) {
            dividedCards.push({
              ...card,
              cardAmountInDeck: amountOfSignatureCardsPerHero
            });
          }
        } else {
          dividedCards.push(card);
        }
      });
    }
    if (dividedCards.length !== 5) {
      throw new console.error("Wrong amount of heroes in the deck");
    }
    const deckHeroes = dividedCards.map(card =>
      this.GetHeroBasedOnSignatureCard(card)
    );
    return deckHeroes;
  }
  public static GetSignatureCardsFromDeck(cards: ICard[]) {
    return cards.filter(card => card.isSignatureCard);
  }
  public static GetHeroBasedOnSignatureCard(card: ICard) {
    const allHeroes = this.GetAllHeroes();
    return allHeroes.find(hero => hero.signatureCard === card.cardName);
  }
  private static getHeroesFromExport(heroObject): IHero[] {
    return Object.keys(heroObject).map(heroName => heroObject[heroName]);
  }
}
