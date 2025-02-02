import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rules } from '../interfaces/rules.interface';

@Injectable() 

export class RulesService {
  public rules: any;
  private dataRulesAll: any;
  public title: string = '';
  public subtitle: string = '';
  public text: string = '';
  public date: Date = new Date();
  private HTML: any;
  constructor(private httpClient: HttpClient) {
    this.getAll()
    this.HTML = function(){
      var x,mnem: any =
      {34:"quot",38:"amp",39:"apos",60:"lt",62:"gt",402:"fnof",
      338:"OElig",339:"oelig",352:"Scaron",353:"scaron",
      376:"Yuml",710:"circ",732:"tilde",8226:"bull",8230:"hellip",
      8242:"prime",8243:"Prime",8254:"oline",8260:"frasl",8472:"weierp",
      8465:"image",8476:"real",8482:"trade",8501:"alefsym",8592:"larr",
      8593:"uarr",8594:"rarr",8595:"darr",8596:"harr",8629:"crarr",
      8656:"lArr",8657:"uArr",8658:"rArr",8659:"dArr",8660:"hArr",
      8704:"forall",8706:"part",8707:"exist",8709:"empty",8711:"nabla",
      8712:"isin",8713:"notin",8715:"ni",8719:"prod",8721:"sum",
      8722:"minus",8727:"lowast",8730:"radic",8733:"prop",8734:"infin",
      8736:"ang",8743:"and",8744:"or",8745:"cap",8746:"cup",8747:"int",
      8756:"there4",8764:"sim",8773:"cong",8776:"asymp",8800:"ne",
      8801:"equiv",8804:"le",8805:"ge",8834:"sub",8835:"sup",8836:"nsub",
      8838:"sube",8839:"supe",8853:"oplus",8855:"otimes",8869:"perp",
      8901:"sdot",8968:"lceil",8969:"rceil",8970:"lfloor",8971:"rfloor",
      9001:"lang",9002:"rang",9674:"loz",9824:"spades",9827:"clubs",
      9829:"hearts",9830:"diams",8194:"ensp",8195:"emsp",8201:"thinsp",
      8204:"zwnj",8205:"zwj",8206:"lrm",8207:"rlm",8211:"ndash",
      8212:"mdash",8216:"lsquo",8217:"rsquo",8218:"sbquo",8220:"ldquo",
      8221:"rdquo",8222:"bdquo",8224:"dagger",8225:"Dagger",8240:"permil",
      8249:"lsaquo",8250:"rsaquo",8364:"euro",977:"thetasym",978:"upsih",982:"piv"},
      tab=("nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|"+
      "copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|"+
      "acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|"+
      "frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|"+
      "Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|"+
      "Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|"+
      "Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|"+
      "szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|"+
      "egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|"+
      "ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|"+
      "ucirc|uuml|yacute|thorn|yuml").split("|");
      for(x=0;x<96;x++)mnem[160+x]=tab[x];
      tab=("Alpha|Beta|Gamma|Delta|Epsilon|Zeta|Eta|Theta|Iota|Kappa|"+
      "Lambda|Mu|Nu|Xi|Omicron|Pi|Rho").split("|");
      for(x=0;x<17;x++)mnem[913+x]=tab[x];
      tab=("Sigma|Tau|Upsilon|Phi|Chi|Psi|Omega").split("|");
      for(x=0;x<7;x++)mnem[931+x]=tab[x];
      tab=("alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|"+
      "lambda|mu|nu|xi|omicron|pi|rho|sigmaf|sigma|tau|upsilon|phi|chi|"+
      "psi|omega").split("|");
      for(x=0;x<25;x++)mnem[945+x]=tab[x];
      return {
        decode:function(text: any){
          return text.replace(/\&#?(\w+);/g,(a: any, b: any): string | undefined => {
              if (Number(b))
                return String.fromCharCode(Number(b));
              for (x in mnem) {
                if (mnem[x] === b)
                  return String.fromCharCode(Number(x));
              }
              return;
            })
        }
      }
    }()
  }


  getAll() {
     this.httpClient.get('http://mouse.api-amazing.com/methods/rules.all')
      .subscribe((response) => {
        this.dataRulesAll = Object.values(response).map(v => Object.values(response));
        this.dataRulesAll[0];
        this.rules = this.dataRulesAll[0]
      })
   }

   get(id: number) {
       this.httpClient.get('https://mouse.api-amazing.com/methods/rules.get?id=' + id)
       // Как тут использовать интерфейс - не разобрался
      .subscribe((response: Rules | any) => {
        this.title = response.title;
        this.subtitle = response.subtitle;
        this.text = this.HTML.decode(response.text);
        this.date = new Date(response.date);
      })
   }
}
