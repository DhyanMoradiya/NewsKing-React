import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 16,
        category: "genral"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    articles = []

    capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    constructor(props) {
        super()
        this.state = {
            articles: this.articles,
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalize(props.category)} - NewsKing`
    }

    componentDidMount() {
        this.updatePage()
    }

    updatePage = async () => {
        this.props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5b80d25015784209a8fd0479421c196a&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({
            loading: true
        })
        let data = await fetch(url)
        this.props.setProgress(30)
        let parsedData = await data.json()
        this.props.setProgress(70)
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100)
    }

    // handlePrevClick = async () => {
    //     this.setState({ page: this.state.page - 1 })
    //     this.updatePage()
    // }

    // handleNextClick = async () => {
    //     this.setState({ page: this.state.page + 1 })
    //     this.updatePage()
    // }

    fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5b80d25015784209a8fd0479421c196a&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
        this.setState({ page: this.state.page + 1 })
        this.setState({
            loading: true
        })
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        })
    };


    render() {
        return (
            <>
                <h2 className='text-center' style={{margin:"100px 0 25px 0"}}>NewsKing - Top {this.capitalize(this.props.category)} News</h2>

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}>

                    <div className='container my-4'>
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div key={element.url} className="col-md-3">
                                    <NewsItem title={element.title ? element.title.slice(0, 35).concat(element.title.length < 35 ? "" : "...") : ""}
                                        description={element.description ? element.description.slice(0, 88).concat(element.description.length
                                            < 88 ? "" : "...") : ""}
                                        auther={element.author ? element.author : "UnKnown"}
                                        date={!element.date ? element.publishedAt : ""}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={(this.state.page + 1) > Math.ceil(this.state.totleResulte / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </>
        )
    }
}

export default News
