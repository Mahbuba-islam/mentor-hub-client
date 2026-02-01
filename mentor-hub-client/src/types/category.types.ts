export interface Category {
  data: any
  filter(arg0: (c: any) => boolean): Category
  id: string
  name: string
}
