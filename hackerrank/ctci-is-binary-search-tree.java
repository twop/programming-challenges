class A {

    boolean checkBST(Node root) {
        if (root == null)
            return false;
        return checkBSTRange(root, null, null);
    }

    boolean checkBSTRange(Node root, Integer min, Integer max) {
        int data = root.data;
        Node right = root.right;
        Node left = root.left;
        boolean isInRange = satisfyRange(data, min, max);
        boolean rightIsGood = right != null && right.data > data && checkBSTRange(right, data, max) || right == null;
        boolean leftIsGood = left != null && left.data < data && checkBSTRange(left, min, data) || left == null;
        return isInRange && rightIsGood && leftIsGood;

    }

    boolean satisfyRange(int val, Integer min, Integer max) {
        boolean passMin = min != null && val > min || min == null;
        boolean passMax = max != null && val < max || max == null;
        return passMin && passMax;
    }

}