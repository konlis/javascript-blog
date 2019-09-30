'use strict';

function titleClickHandler(event) {
  //console.log('Link was clicked!');
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  event.preventDefault();
  /* add class 'active' to the clicked link */
  const clickedElement = this;
  //console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');
  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  //console.log('articleSelector and getAttribute:', articleSelector);
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  //console.log('targetArticle', targetArticle);
  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
  //console.log('targetArticle', targetArticle);
}
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleTagSelector = '.post-tags a',
  optArticleAuthorSelector = '.post-author',
  optArticleAuthorSelectorLink = '.post-author a',
  optTagsListSelector = '.tags .list';

function generateTitleLinks(customSelector = ' ') {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  //console.log('titleList', titleList);
  titleList.innerHTML = '';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  //console.log('articles', articles);
  let html = '';
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');
    //console.log('articleId', articleId);
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    //console.log('articleTitle', articleId);
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log('linkHTML', linkHTML);
    /* insert link into titleList */
    html = html + linkHTML;
    //console.log('html', html);
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  //console.log('links', links);
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function calculateTagsParams(){
  const params = {
    max : 0,
    min: 999999
  }
  return params;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  //console.log('articles', articles);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const taglist = article.querySelector(optArticleTagsSelector);
    //console.log('taglist', taglist);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    //console.log('articleTags:', articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    //console.log('articleTagsArray', articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      //console.log('tag:', tag);
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>' + ' ';
      //console.log('linkHTML', linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML;
      //console.log('html', html);
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)) {
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    taglist.innerHTML = html;
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  /*[NEW] add html from allTags to taglist */
  let allTagsHTML = '';
  //console.log('allTagsHTML:', allTagsHTML);
  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /*[NEW] generate code of a link and add it to allTagsHTML */
    //allTagsHTML += '<li><a href="#tag-' + tag + '">' + allTags[tag] + '</a></li>';
    allTagsHTML += '<li><a class="' + (allTags[tag]) + '" href="#tag-' + tag + '">' + tag + '</a></li>';
    //console.log('allTagsHTML:', allTagsHTML);
    /* [NEW] END LOOP: for each tag in allTags: */
  }

  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTags.join(' ');
  //console.log('allTags:', allTags);
}
generateTags();

function tagClickHandler(event) {
  //console.log('Link was clicked!');
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  //console.log('this', this);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  //console.log('clickedElement:', href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  //console.log('tag:', tag);
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  //console.log('activeTags:', activeTags);
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /* remove class active */
    activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href^="#tag-' + tag + '"]');
  //console.log('tagLinks:', tagLinks);
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
    //console.log('tagLink:', tagLink);
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll(optArticleTagSelector, optArticleTagsSelector);
  //console.log('tagLinks:', tagLinks)
  /* START LOOP: for each link */
  for (let tag of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tag.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToTags();

function generateAuthors() {
  /* find all article authors */
  const authorArticles = document.querySelectorAll(optArticleSelector);
  //console.log('authorArticles:', authorArticles);
  /* START LOOP: for every author: */
  for (let authorArticle of authorArticles) {
    //console.log('authorArticle',authorArticle);
    //console.log('authorArticles', authorArticles);
    /* find author wrapper */
    const authorList = authorArticle.querySelector(optArticleAuthorSelector);
    //console.log('authorList:', authorList);
    /* make html variable with empty string */
    let html = '';
    //console.log(html);
    /* get authors from data-author attribute */
    const articleAuthor = authorArticle.getAttribute('data-authors');
    //console.log('articleAuthor:', articleAuthor);
    /* generate HTML of the link */
    const linkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>' + ' ';
    //console.log('linkHTML:', linkHTML);
    /* add generated code to html variable */
    html = html + linkHTML;
    //console.log(html);
    /* insert HTML of all the links into the author wrapper */
    authorList.innerHTML = html;
    /* END LOOP: for every author: */
  }
}
generateAuthors();

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  //console.log('this:', this);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  //console.log('clickedElement', href);
  /* make a new constant "author" and extract authors from the "href" constant */
  const author = href.replace('#author-', '');
  //console.log('author:', author);
  /* find all author links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  //console.log('activeAuthors:', activeAuthors);
  /* START LOOP: for each active author link */
  for (let activeAuthor of activeAuthors) {
    //console.log('activeAuthor:', activeAuthor);
    /* remove class active */
    activeAuthor.classList.remove('active');
    console.log('activeAuthor:', activeAuthor);
    /* END LOOP: for each active author link */
  }
  /* find all auithor links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href^="#author-' + author + '"]');
  //console.log('authorLinks:', authorLinks);
  /* START LOOP: for each found author link */
  for (let authorLink of authorLinks) {
    /* add class active */
    authorLink.classList.add('active');
    /* END LOOP: for each found author link */
  }
  /* execute function "generateTitleLinks" with author selector as argument */
  generateTitleLinks('[data-authors="' + author + '"]');
  //console.log(generateTitleLinks);
}

function addClickListenersToAuthors() {
  /* find all links to authors */
  const linksToAuthors = document.querySelectorAll(optArticleAuthorSelector + optArticleAuthorSelectorLink);
  //console.log('authorLinks:', authorLinks);
  /* START LOOP: for each link */
  for (let author of linksToAuthors) {
    /* add authorClickHandler as event listener for that link */
    author.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();
