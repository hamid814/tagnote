class ColStak {
  constructor() {
    this.cols = [];
    this.count = 0;
  }

  // col structure
  // {
  //   height: xx,
  //   left: xx
  // }

  push(col) {
    this.cols[this.count] = col;
    this.count += 1;
  }

  clear() {
    this.cols = [];
    this.count = 0;
  }

  getShort() {
    const minHeight = Math.min(...this.cols.map((col) => col.height), Infinity);
    return this.cols.find((col) => col.height === minHeight);
  }

  getLong() {
    const maxHeight = Math.max(...this.cols.map((col) => col.height), 0);
    return this.cols.find((col) => col.height === maxHeight);
  }

  updateShort(height) {
    const minHeight = Math.min(...this.cols.map((col) => col.height), Infinity);
    const index = this.cols.findIndex((col) => col.height === minHeight);
    this.cols[index] = {
      ...this.cols[index],
      height: this.cols[index].height + height,
    };
  }
}

const createLayout = (container, childWidth = 250) => {
  let itemWidth;

  if (container.parentElement.getBoundingClientRect().width < 530) {
    itemWidth = container.parentElement.getBoundingClientRect().width / 2;
  } else {
    itemWidth = childWidth;
  }

  const containerParentWidth = container.parentElement.getBoundingClientRect()
    .width;

  const colCount = Math.floor(containerParentWidth / itemWidth);

  const columns = new ColStak();

  for (var i = 0; i < colCount; i++) {
    columns.push({
      height: 0,
      left: i * itemWidth,
    });
  }

  for (var j = 0; j < container.children.length; j++) {
    container.children[j].style.width = itemWidth + 'px';
    container.children[j].style.transitionDelay = `${30 * j}ms`;
    container.children[j].style.transform = 'translateY(0)';

    const itemLeft = columns.getShort().left + 'px';
    const itemTop = columns.getShort().height + 'px';

    container.children[j].style.top = itemTop;
    container.children[j].style.left = itemLeft;

    container.children[j].style.opacity = 1;

    const itemheight = Math.floor(
      container.children[j].getBoundingClientRect().height
    );

    columns.updateShort(itemheight);
  }

  container.style.height = columns.getLong().height + 'px';
  container.style.width = columns.count * itemWidth + 'px';

  // container.children.forEach((item) => {
  //   item.style.width = itemWidth + 'px';

  //   const itemLeft = columns.getShort().left + 'px';
  //   const itemTop = columns.getShort().height + 'px';

  //   item.style.transform = `translateX(${itemLeft}) translateY(${itemTop})`;

  //   item.style.opacity = 1;

  //   const itemheight = Math.floor(item.getBoundingClientRect().height);

  //   columns.updateShort(itemheight);

  //   container.style.height = columns.getLong().height + 'px';
  //   container.style.width = columns.count * itemWidth + 'px';
  // });
};

export default createLayout;
