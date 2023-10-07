//递归修改树结构的字段名
function getTreeData(list) {
    var newarr = [];
    for (var i = 0; i < list.length; i++) {
        var obj = list[i];
        //!!!此处替换字段
        obj.text = obj.label
        obj.value = obj.id
        if (obj.children) {
            obj.children = getTreeData(obj.children);
        }
        newarr.push(obj);
    }
    return newarr;
}

//树形结构转扁平数组
function flattenArr(tree, arr = [], parentId = null) {
    tree?.forEach(item => {
        // 结构item
        const { children, ...props } = item
        // 添加除了children的属性
        parentId ? props.parentId = parentId : ''
        arr.push(props)
        if (children?.length != 0) {
            // 存在children递归将所有节点加入到结果集中
            flattenArr(children, arr, props.id)
        }
    })
    return arr
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
function handleTree(data, id, parentId, children) {
    let config = {
        id: id || 'id',
        parentId: parentId || 'parentId',
        childrenList: children || 'children'
    };

    var childrenListMap = {};
    var nodeIds = {};
    var tree = [];

    for (let d of data) {
        let parentId = d[config.parentId];
        if (childrenListMap[parentId] == null) {
            childrenListMap[parentId] = [];
        }
        nodeIds[d[config.id]] = d;
        childrenListMap[parentId].push(d);
    }

    for (let d of data) {
        let parentId = d[config.parentId];
        if (nodeIds[parentId] == null) {
            tree.push(d);
        }
    }

    for (let t of tree) {
        adaptToChildrenList(t);
    }

    function adaptToChildrenList(o) {
        if (childrenListMap[o[config.id]] !== null) {
            o[config.childrenList] = childrenListMap[o[config.id]];
        }
        if (o[config.childrenList]) {
            for (let c of o[config.childrenList]) {
                adaptToChildrenList(c);
            }
        }
    }
    return tree;
}

$.getJSON('./CSDN_Plugin_2023-08-14 19_10_43.json', function (data) {
    console.log("json文件数据", data);
    var list = data;
    var newarr = handleTree(flattenArr(list))
    console.log(newarr);

})

