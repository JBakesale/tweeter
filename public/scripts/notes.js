$(document).ready(function () {
  function createTweetElement(tweetData) {
    function escape(str) {
      return str;
      var div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }
    var article = (
      <article class="tweet">
        <header>
          <img src="${escape(tweetData.user.avatars.regular)}" alt="avatars" />
          <div class="user-info">
            <h2>${escape(tweetData.user.name)}</h2>
            <span>${escape(tweetData.user.handle)}</span>
          </div>
        </header>
        <div>${escape(tweetData.content.text)}</div>
        <footer>
          ${escape(tweetData.created_at)}
          <div class="icons">
            <i class="fa fa-flag" aria-hidden="true"></i>
            <i class="fa fa-retweet" aria-hidden="true"></i>
            <i class="fa fa-heart" aria-hidden="true"></i>
          </div>
        </footer>
      </article>
    );
    return article;
  }
});
