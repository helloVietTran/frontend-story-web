export const options = [
  {
    name: "Tất cả",
    description: "Tất cả thể loại",
    active: true,
    path: "/find-story",
  },
  {
    name: "Action",
    description:
      "Thể loại này thường có nội dung về đánh nhau, bạo lực, hỗn loạn, với diễn biến nhanh",
    active: false,
    path: "/find-story/action",
    queryCode: "1",
  },
  {
    name: "Adventure",
    description:
      "Thể loại phiêu lưu, mạo hiểm, thường là hành trình của các nhân vật",
    active: false,
    path: "/find-story/adventure",
    queryCode: "2",
  },

  {
    name: "Chuyển sinh",
    description:
      "Thể loại này là những câu chuyện về người ở một thế giới này xuyên đến một thế giới khác, có thể là thế giới mang phong cách trung cổ với kiếm sĩ và ma thuật, hay thế giới trong game, hoặc có thể là bạn chết ở nơi này và được chuyển sinh đến nơi khác",
    active: false,
    path: "/find-story/chuyen-sinh",

    queryCode: "3",
  },
  {
    name: "Cooking",
    description: "Thể loại có nội dung về nấu ăn, ẩm thực",
    active: false,
    path: "/find-story/cooking",
    queryCode: "4",
  },
  {
    name: "Comedy",
    description:
      "Thể loại có nội dung trong sáng và cảm động, thường có các tình tiết gây cười, các xung đột nhẹ nhàng",
    active: false,
    path: "/find-story/comedy",
    queryCode: "5",
  },
  {
    name: "Comic",
    description: "Truyện tranh Châu Âu và Châu Mĩ",
    active: false,
    path: "/find-story/comic",
    queryCode: "6",
  },
  {
    name: "Cổ đại",
    description: "Truyện có nội dung xảy ra ở thời cổ đại phong kiến.",
    active: false,
    path: "/find-story/co-dai",
    queryCode: "7",
  },
  {
    name: "Drama",
    description:
      "Thể loại mang đến cho người xem những cảm xúc khác nhau: buồn bã, căng thẳng thậm chí là bi phẫn",
    active: false,
    path: "/find-story/drama",
    queryCode: "8",
  },
  {
    name: "Historical",
    description: "Thể loại có liên quan đến thời xa xưa",
    active: false,
    path: "/find-story/historical",
    queryCode: "9",
  },
  {
    name: "Horror",
    description:
      "Horror là: rùng rợn, nghe cái tên là bạn đã hiểu thể loại này có nội dung thế nào. Nó làm cho bạn kinh hãi, khiếp sợ, ghê tởm, run rẩy, có thể gây sock - một thể loại không dành cho người yếu tim",
    active: false,
    path: "/find-story/horror",
    queryCode: "10",
  },
  {
    name: "Live action",
    description: "Truyện đã được chuyển thể thành phim",
    active: false,
    path: "/find-story/live-action",
    queryCode: "11",
  },
  {
    name: "Manga",
    description: "Truyện tranh của Nhật Bản",
    active: false,
    path: "/find-story/manga",
    queryCode: "12",
  },
  {
    name: "Manhua",
    description: "Truyện tranh của Trung Quốc",
    active: true,
    path: "/find-story/manhua",
    queryCode: "13",
  },
  {
    name: "Manhwa",
    description: "Truyện tranh Hàn Quốc, đọc từ trái sang phải",
    active: false,
    path: "/find-story/manhwa",
    queryCode: "14",
  },
  {
    name: "Psylogical",
    description:
      "Thể loại liên quan đến những vấn đề về tâm lý của nhân vật ( tâm thần bất ổn, điên cuồng ...)",
    active: false,
    path: "/find-story/psylogical",
    queryCode: "15",
  },
  {
    name: "Romance",
    description:
      "Thường là những câu chuyện về tình yêu, tình cảm lãng mạn. Ớ đây chúng ta sẽ lấy ví dụ như tình yêu giữa một người con trai và con gái, bên cạnh đó đặc điểm thể loại này là kích thích trí tưởng tượng của bạn về tình yêu",
    active: true,
    path: "/find-story/romance",
    queryCode: "16",
  },
  {
    name: "School Life",
    description:
      "Trong thể loại này, ngữ cảnh diễn biến câu chuyện chủ yếu ở trường học",
    active: false,
    path: "/find-story/school-life",
    queryCode: "17",
  },
  {
    name: "Sci-fi",
    description:
      "Bao gồm những chuyện khoa học viễn tưởng, đa phần chúng xoay quanh nhiều hiện tượng mà liên quan tới khoa học, công nghệ, tuy vậy thường thì những câu chuyện đó không gắn bó chặt chẽ với các thành tựu khoa học hiện thời, mà là do con người tưởng tượng ra",
    active: false,
    path: "/find-story/sci-fi",
    queryCode: "18",
  },
  {
    name: "Sports",
    description:
      "Đúng như tên gọi, những môn thể thao như bóng đá, bóng chày, bóng chuyền, đua xe, cầu lông,... là một phần của thể loại này",
    active: false,
    path: "/find-story/sports",
    queryCode: "19",
  },
  {
    name: "Thiếu nhi",
    description: "Truyện tranh dành cho lứa tuổi thiếu nhi",
    active: false,
    path: "/find-story/thieu-nhi",
    queryCode: "20",
  },
  {
    name: "Trinh thám",
    description:
      "Các truyện có nội dung về các vụ án, các thám tử cảnh sát điều tra...",
    active: false,
    path: "/find-story/trinh-tham",
    queryCode: "21",
  },
  {
    name: "Truyện scan",
    description: "Các truyện đã phát hành tại VN được scan đăng online",
    active: false,
    path: "/find-story/truyen-scan",
    queryCode: "22",
  },
  {
    name: "Truyện màu",
    description: "Tổng hợp truyện tranh màu, rõ, đẹp",
    active: false,
    path: "/find-story/truyen-mau",
    queryCode: "23",
  },
];
