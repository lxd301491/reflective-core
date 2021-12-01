export function traversal(root: Node, callback: (el: Node) => void): void {
  callback(root);
  root.childNodes && root.childNodes.forEach(child => {
    traversal(child, callback);
  });
}
