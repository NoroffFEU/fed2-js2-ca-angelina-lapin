export default async function router(pathname = window.location.pathname) {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (pathname.includes("/post/view/") && postId) {
    await import("./views/post.js").then((module) =>
      module.renderPostView(postId)
    );
    return;
  }
  if (pathname.includes("/post/edit/") && postId) {
    await import("./views/postEdit.js").then((module) =>
      module.renderPostEdit(postId)
    );
    return;
  }

  switch (pathname) {
    case "/":
      await import("./views/home.js").then((module) => module.renderHome());
      break;
    case "/auth/login/":
      await import("./views/login.js").then((module) => module.renderLogin());
      break;
    case "/auth/register/":
      await import("./views/register.js").then((module) =>
        module.renderRegister()
      );
      break;
    case "/profile/":
      await import("./views/profile.js").then((module) =>
        module.renderProfile()
      );
      break;
    case "/post/create/":
      await import("./views/postCreate.js").then((module) =>
        module.renderPostCreate()
      );
      break;
    default:
      await import("./views/notFound.js").then((module) =>
        module.renderNotFound()
      );
  }
}
