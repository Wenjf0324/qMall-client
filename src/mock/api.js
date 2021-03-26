import Mock from "mockjs";
Mock.mock("/api/homecasual", {
  status: 0,
  data: [
    {
      imgurl: "http://127.0.0.1:3000/images/home/b1.png",
      detail: "http://mobile.yangkeduo.com/subject.html?subject_id=6153"
    },
    {
      imgurl: "http://127.0.0.1:3000/images/home/b2.png",
      detail: "http://mobile.yangkeduo.com/promotion_op.html?type=12&id=228"
    },
    {
      imgurl: "http://127.0.0.1:3000/images/home/b3.png",
      detail: "http://mobile.yangkeduo.com/subject.html?subject_id=6242"
    },
    {
      imgurl: "http://127.0.0.1:3000/images/home/b4.png",
      detail: "http://mobile.yangkeduo.com/subject.html?subject_id=6153"
    },
    {
      imgurl: "http://127.0.0.1:3000/images/home/b5.png",
      detail: "http://mobile.yangkeduo.com/subject.html?subject_id=6230"
    }
  ]
});
