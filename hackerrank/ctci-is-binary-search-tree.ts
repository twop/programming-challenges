type NodeT = {
  data: number;
  left?: NodeT;
  right?: NodeT;
};

function checkBST(rootNode?: NodeT, min?: number, max?: number): boolean {
  if (!rootNode) return false;

  const { data, right, left } = rootNode;
  const isInRange = satisfyRange(data, min, max);
  const rightIsGood =
    (right && right.data > data && checkBST(right, data, max)) || !right;
  const leftIsGood =
    (left && left.data < data && checkBST(left, min, data)) || !left;
  return isInRange && !!rightIsGood && !!leftIsGood;
}

const satisfyRange = (val: number, min?: number, max?: number): boolean =>
  ((min && val > min) || !min) && ((max && val < max) || !max);

const root: NodeT = {
  data: 4,
  left: {
    data: 2,
    left: { data: 1 },
    right: { data: 3 }
  },
  right: {
    data: 6,
    left: { data: 5 },
    right: { data: 7 }
  }
};

// console.log(checkBST(root, undefined, undefined));
