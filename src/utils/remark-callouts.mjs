import { visit } from 'unist-util-visit';

const MAP = {
	message: 'message',
	alert: 'alert',
};

export default function remarkCallouts() {
	return (tree) => {
		visit(tree, ['containerDirective'], (node) => {
			const kind = MAP[node.name];
			if (!kind) {
				return;
			}

			node.data ??= {};
			node.data.hName = 'aside';
			node.data.hProperties = {
				className: ['callout', `callout-${kind}`],
			};
		});
	};
}
