import { TreeDelegate } from 'TreeView'
import MetaTreeNode from './MetaTreeNode'

///////////////////////////////////////////////////////////////////////////////
//
//
///////////////////////////////////////////////////////////////////////////////
export default class MetaTreeDelegate extends TreeDelegate {

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  constructor (model) {

    super ()

    this.instanceTree = model.getData().instanceTree
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  createRootNode (data) {

    this.rootNode = new MetaTreeNode({
      name: this.instanceTree.getNodeName(data.id),
      group: this.getChildIds(data.id).length,
      instanceTree: this.instanceTree,
      checked: data.checked,
      parent: data.parent,
      type: data.type,
      id: data.id
    })

    this.rootNode.on('checked', (node) => {

      this.emit('node.checked', node)
    })

    return this.rootNode
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  unmount () {

    this.rootNode.unmount()
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  createTreeNode (node, parentDomElement, options = {}) {

    const container = document.createElement('div')

    parentDomElement.appendChild(container)

    node.mount(container)
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  nodeClickSelector (event) {

    const selector = ['HEADER', 'LABEL']

    return (selector.indexOf(event.target.nodeName) > -1)
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  forEachChild (node, addChild) {

    node.addChild = addChild
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  getChildIds (nodeId) {

    const childIds = []

    this.instanceTree.enumNodeChildren(nodeId,
      (childId) => {

        childIds.push(childId)
      })

    return childIds
  }
}
