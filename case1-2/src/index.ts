type IFruit = {
  fruitId: number;
  fruitName: string;
  fruitType: "IMPORT" | "LOCAL";
  stock: number;
};

const fruits: IFruit[] = [
  { fruitId: 1, fruitName: "Apel", fruitType: "IMPORT", stock: 10 },
  { fruitId: 2, fruitName: "Kurma", fruitType: "IMPORT", stock: 20 },
  { fruitId: 3, fruitName: "apel", fruitType: "IMPORT", stock: 50 },
  { fruitId: 4, fruitName: "Manggis", fruitType: "LOCAL", stock: 100 },
  {
    fruitId: 5,
    fruitName: "@#4)Je-ruk* Ba++li123",
    fruitType: "LOCAL",
    stock: 10,
  },
  { fruitId: 5, fruitName: "KURMA", fruitType: "IMPORT", stock: 20 }, // Masalah: fruitId duplikat
  { fruitId: 5, fruitName: "Salak", fruitType: "LOCAL", stock: 150 }, // Masalah: fruitId duplikat
];

function capitalizeAndSanitize(words: string): string {
  let sanitized = "";
  for (let i = 0; i < words.length; i++) {
    if (words[i].match(/[a-zA-Z\s]/)) {
      sanitized += words[i];
    }
  }
  return sanitized
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function getFruitNames(fruits: IFruit[]): string[] {
  const fruitNamesSet: Set<string> = new Set();
  for (const fruit of fruits) {
    fruitNamesSet.add(capitalizeAndSanitize(fruit.fruitName));
  }
  return Array.from(fruitNamesSet);
}

// Andi memisahkan buahnya menjadi beberapa wadah berdasarkan tipe buah
// (fruitType). Berapa jumlah wadah yang dibutuhkan? Dan ada buah apa saja di
// masing-masing wadah?

function groupFruitsByType(fruits: IFruit[]): Record<string, string[]> {
  const groupedFruits: Record<string, Set<string>> = {};
  for (const fruit of fruits) {
    const type = fruit.fruitType;
    const name = capitalizeAndSanitize(fruit.fruitName);
    if (!groupedFruits[type]) {
      groupedFruits[type] = new Set();
    }
    groupedFruits[type].add(name);
  }
  const result: Record<string, string[]> = {};
  for (const type in groupedFruits) {
    result[type] = Array.from(groupedFruits[type]);
  }
  return result;
}

// Berapa total stock buah yang ada di masing-masing wadah?
function getTotalStockByType(fruits: IFruit[]): Record<string, number> {
  const stockByType: Record<string, number> = {};
  for (const fruit of fruits) {
    const type = fruit.fruitType;
    if (!stockByType[type]) {
      stockByType[type] = 0;
    }
    stockByType[type] += fruit.stock;
  }
  return stockByType;
}

console.log(getFruitNames(fruits));
console.log(groupFruitsByType(fruits));
console.log(getTotalStockByType(fruits));

type IComment = {
  commentId: number;
  commentContent: string;
  replies?: IComment[];
};

const comments: IComment[] = [
  {
    commentId: 1,
    commentContent: "Hai",
    replies: [
      {
        commentId: 11,
        commentContent: "Hai juga",
        replies: [
          { commentId: 111, commentContent: "Haai juga hai jugaa" },
          { commentId: 112, commentContent: "Haai juga hai jugaa" },
        ],
      },
      {
        commentId: 12,
        commentContent: "Hai juga",
        replies: [{ commentId: 121, commentContent: "Haai juga hai jugaa" }],
      },
    ],
  },
  { commentId: 2, commentContent: "Halooo" },
];

const countCommentsRecursive = (nodes: IComment[] | undefined): number => {
  if (!nodes || nodes.length === 0) return 0;

  let total = 0;
  for (const node of nodes) {
    total += 1;
    total += countCommentsRecursive(node.replies);
  }
  return total;
};

console.log(countCommentsRecursive(comments));
