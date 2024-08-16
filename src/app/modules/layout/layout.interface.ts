export interface TFaqItem {
  question: string;
  answer: string;
}

export interface TCategories {
  title: string;
}

export interface TBannerImage {
  public_url: string;
  url: string;
}

export interface TLayout {
    type:string,
    faq:TFaqItem[],
    categories:TCategories[],
    banner:{
        image:TBannerImage,
        title:string,
        subTitle:string
    }
}